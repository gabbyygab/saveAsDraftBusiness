import type { Route } from "./+types/home";
import { SaveAsDraftHome } from "../components/SaveAsDraftHome";
import { data } from "react-router";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const getEnv = (key: string) => {
  return import.meta.env[key] || process.env[key] || "";
};

const supabaseUrl = getEnv("VITE_SUPABASE_URL");
const supabaseAnonKey = getEnv("VITE_SUPABASE_ANON_KEY");

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Supabase credentials missing. Check your .env file.");
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function loader() {
  // ── Track this visit ──────────────────────────────────────────────
  await supabase.from("site_visits").insert([{ visited_at: new Date().toISOString() }]);

  // ── Fetch total visit count ───────────────────────────────────────
  const { count: visitCount } = await supabase
    .from("site_visits")
    .select("*", { count: "exact", head: true });

  // ── Fetch latest feedbacks ────────────────────────────────────────
  const { data: feedbacks, error } = await supabase
    .from("feedback")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(5);

  if (error) {
    console.error("[Loader] Supabase Error:", error);
    return { feedbacks: [], visitCount: visitCount ?? 0 };
  }

  console.log(`[Loader] Fetched ${feedbacks?.length || 0} feedbacks. Total visits: ${visitCount}`);
  return { feedbacks: feedbacks || [], visitCount: visitCount ?? 0 };
}

export const action = async ({ request }: Route.ActionArgs) => {
  const formData = await request.formData();
  const intent = formData.get("intent");

  if (intent === "feedback") {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const rating = parseInt(formData.get("rating") as string);
    const message = formData.get("message") as string;

    // Insert into Supabase
    const { error } = await supabase
      .from("feedback")
      .insert([{ name, email, rating, message }]);

    if (error) {
      console.error("Supabase Error:", error);
      return data({ error: "Failed to submit feedback. Please try again." }, { status: 500 });
    }

    return data({ message: "Thank you for your feedback!" }, { status: 200 });
  }

  return data({ message: "Unknown action" }, { status: 400 });
};

export function meta({}: Route.MetaArgs) {
  return [
    { title: "SaveAsDraft – A Story For A Lifetime" },
    {
      name: "description",
      content:
        "SaveAsDraft – Specializing in untraditional, personalized digital invitations that transform your story into visually compelling designs for weddings and events.",
    },
    { name: "og:title", content: "SaveAsDraft – A Story For A Lifetime" },
    {
      name: "og:description",
      content:
        "Beautiful, custom digital invitations for weddings and events. RSVP, maps, gallery, and more – all in one elegant link.",
    },
  ];
}

export default function Home() {
  return <SaveAsDraftHome />;
}
