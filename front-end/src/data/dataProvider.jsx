// src/data/dataProvider.jsx
import simpleRestProvider from 'ra-data-simple-rest';

const baseDataProvider = simpleRestProvider('http://localhost:8586');

const dataProvider = {
  ...baseDataProvider,
  getList: (resource, params) => {
    if (resource === 'adminProject') {
      return baseDataProvider.getList('admin/project', params).then(response => {
        response.data = response.data.map(item => ({
          ...item,
          id: item.projectId, // projectId를 id로 매핑
        }));
        return response;
      });
    }
    if (resource === 'user') {
      return baseDataProvider.getList('api/user', params).then(response => {
        response.data = response.data.map(item => ({
          ...item,
          id: item.userId, // userId를 id로 매핑
        }));
        return response;
      });
    }
    // 기본 처리 (다른 리소스, 예: 프로젝트)
    return baseDataProvider.getList(resource, params).then(response => {
      response.data = response.data.map(item => ({
        ...item,
        id: item.projectId,
      }));
      return response;
    });
  },
  getOne: (resource, params) => {
    if (resource === 'adminProject') {
      return baseDataProvider.getOne('admin/project', params).then(response => ({
        data: { ...response.data, id: response.data.projectId },
      }));
    }
    if (resource === 'user') {
      return baseDataProvider.getOne('api/user', params).then(response => ({
        data: { ...response.data, id: response.data.userId },
      }));
    }
    if (resource === 'dashboard') {
      // 대시보드 API 호출 시, 응답 데이터에 id를 추가해서 반환
      return fetch('http://localhost:8586/admin/dashboard', {
        method: 'GET',
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(response.statusText);
          }
          return response.json();
        })
        .then(data => ({
          data: { ...data, id: 'dashboard' }  // id 속성을 추가
        }));
    }
    return baseDataProvider.getOne(resource, params).then(response => ({
      data: { ...response.data, id: response.data.projectId },
    }));
  },
  update: (resource, params) => {
    if (resource === 'adminProject') {
      return baseDataProvider.update('admin/project', params).then(response => ({
        data: { ...response.data, id: response.data.projectId },
      }));
    }
    if (resource === 'user') {
      return baseDataProvider.update('api/user', params).then(response => ({
        data: { ...response.data, id: response.data.userId },
      }));
    }
    return baseDataProvider.update(resource, params).then(response => ({
      data: { ...response.data, id: response.data.projectId },
    }));
  },
  delete: (resource, params) => {
    if (resource === 'adminProject') {
      return baseDataProvider.delete('admin/project', params);
    }
    if (resource === 'user') {
      return baseDataProvider.delete('api/user', params);
    }
    return baseDataProvider.delete(resource, params);
  },
  deleteMany: (resource, params) => {
    if (resource === 'adminProject') {
      return Promise.all(
        params.ids.map(id =>
          baseDataProvider.delete('admin/project', { id })
        )
      ).then(() => ({ data: params.ids }));
    }
    if (resource === 'user') {
      return Promise.all(
        params.ids.map(id =>
          baseDataProvider.delete('api/user', { id })
        )
      ).then(() => ({ data: params.ids }));
    }
    return baseDataProvider.deleteMany(resource, params);
  },
  create: (resource, params) => {
    if (resource === 'adminProject') {
      return baseDataProvider.create('admin/project', params).then(response => ({
        data: { ...response.data, id: response.data.projectId },
      }));
    }
    if (resource === 'user') {
      return baseDataProvider.create('api/user', params).then(response => ({
        data: { ...response.data, id: response.data.userId },
      }));
    }
    return baseDataProvider.create(resource, params).then(response => ({
      data: { ...response.data, id: response.data.projectId },
    }));
  },
};

export { dataProvider };
