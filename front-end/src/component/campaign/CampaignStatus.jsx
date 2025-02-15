import { useMediaQuery } from "react-responsive";

import CampaignStatusMobile from "./CampaignStatusMobile";
import CampaignStatusDesktop from "./CampaignStatusDesktop";

export default function CampaignStatus() {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  return isMobile ? <CampaignStatusMobile /> : <CampaignStatusDesktop />
  // return isMobile ? <CampaignStatusMobile /> : <CampaignStatusMobile />
}