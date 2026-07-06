export default function AdSlot({
  format = "auto",
  label = "Advertisement",
  style,
}: {
  format?: string;
  label?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div className="ad-slot" style={style}>
      {/* 
        Google AdSense ad code will go here after approval.
        Replace this placeholder with actual <ins className="adsbygoogle"> code.
        
        Example:
        <ins className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-XXXX"
          data-ad-slot="XXXX"
          data-ad-format={format}
          data-full-width-responsive="true">
        </ins>
      */}
      {label}
    </div>
  );
}
