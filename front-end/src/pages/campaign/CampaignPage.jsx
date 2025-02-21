import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import Footer from "../../component/common/footer/Footer";
import Navbar from "../../component/common/navbar/Navbar";

import CampaignProfile from "../../component/campaign/CampaignProfile";
import CampaignContext from "../../component/campaign/CampaignContext";

import useCampaignStore from "../../store/useCampaignStore";

import "../../style/scss/style.scss";

function CampaignPage() {
  const { campaignId } = useParams(); // 페이지 URL의 campaignId를 가져옴
  const { toggleMenu, fetchCampaignStatus } = useCampaignStore();

  useEffect(() => {
    fetchCampaignStatus(campaignId); // URL에서 가져온 캠페인의 상세 정보를 받아옴
  }, []);

  return (
    <>
      <Navbar />

      <div style = {{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <CampaignProfile />

        <div className = "toggle">
          <ul>
            {toggleMenu.menuList.map((menu, index) => (
              <li key={index}>
                <Link to={menu.url} className="nav-list">
                  {menu.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <CampaignContext />

        <Footer/>
      </div>
    </>
  );
}

export default CampaignPage