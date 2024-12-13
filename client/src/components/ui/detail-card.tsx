function DetailCard({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-bold text-black dark:text-white">{label}</p>
      <p className="capitalize text-muted-foreground">{value}</p>
    </div>
  );
}

export default DetailCard;
