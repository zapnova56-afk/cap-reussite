export function Champ({ label, name, type = "text", ...rest }: { label: string; name: string; type?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block text-sm font-medium">
      {label}
      <input name={name} type={type} required {...rest}
        className="mt-1 w-full rounded-lg border border-marine/20 bg-white px-3 py-2.5 text-base focus:border-turquoise focus:outline-none focus:ring-2 focus:ring-turquoise/30" />
    </label>
  );
}
export function Erreur({ message }: { message?: string }) {
  return message ? <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{message}</p> : null;
}
