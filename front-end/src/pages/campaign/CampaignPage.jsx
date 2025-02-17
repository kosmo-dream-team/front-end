import { useEffect } from "react";
import { Link } from "react-router-dom";

import Footer from "../../component/common/footer/Footer";
import Navbar from "../../component/common/navbar/Navbar";

import CampaignProfile from "../../component/campaign/CampaignProfile";
import CampaignContext from "../../component/campaign/CampaignContext";

import useCampaignStore from "../../store/useCampaignStore";

import "../../style/scss/style.scss";

function CampaignPage() {
  const { toggleMenu } = useCampaignStore();
  const { campaignStatus, fetchCampaignStatus } = useCampaignStore();

  useEffect(() => {
    console.log('useEffect triggered');
    fetchCampaignStatus();
    console.log(campaignStatus);
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