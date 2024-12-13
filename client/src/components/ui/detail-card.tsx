function DetailCard({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-bold text-black">{label}</p>
      <p className="capitalize text-muted-foreground">{value}</p>
    </div>
  );
}

export default DetailCard;
