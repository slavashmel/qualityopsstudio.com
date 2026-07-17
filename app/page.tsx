import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { detectLocale, defaultLocale } from "@/lib/i18n";

export default async function Home() {
  const cookieStore = await cookies();
  const headerStore = await headers();
  const cookieLocale = cookieStore.get("NEXT_LOCALE")?.value;
  const acceptLanguage = headerStore.get("accept-language");
  const locale = detectLocale(acceptLanguage, cookieLocale);

  redirect(`/${locale || defaultLocale}`);
}
