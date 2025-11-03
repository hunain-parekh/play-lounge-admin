import { redirect } from "next/navigation";

export default function Page() {
  redirect("/dashboard/default");
  return null;
}
