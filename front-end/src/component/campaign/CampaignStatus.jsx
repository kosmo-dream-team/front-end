import { useMediaQuery } from "react-responsive";

import CampaignStatusDesktop from "./CampaignStatusDesktop";
import CampaignStatusMobile from "./CampaignStatusMobile";

export default function CampaignStatus() {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  return isMobile ? <CampaignStatusMobile /> : <CampaignStatusDesktop />;
  // return isMobile ? <CampaignStatusMobile /> : <CampaignStatusMobile />
}
