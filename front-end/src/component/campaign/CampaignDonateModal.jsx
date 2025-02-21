export default function CampaignDonateModal({isOpen, onClose, children}) {
  if (!isOpen) return null;

  return (
    <div className = "donate-modal-overlay">
      <div className = "donate-modal">
        <button className = "modal-close" onClick = {onClose}>X</button>
        {children}
      </div>
    </div>
  );
}