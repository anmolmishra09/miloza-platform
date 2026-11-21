import type { User } from "@/types";

export function seedUsers(): User[] {
  const base = [
    { name: "Maya Chen", username: "mayac", bio: "Designer & coffee enthusiast. Let's talk art and playlists.", location: "Singapore", interests: ["Design", "Coffee", "Music"] },
    { name: "Liam Okafor", username: "liamo", bio: "Runner, coder, and part-time chef. Always up for a chat.", location: "Lagos", interests: ["Running", "Tech", "Cooking"] },
    { name: "Sofia Rossi", username: "sofiar", bio: "Travel photographer chasing golden hour.", location: "Milan", interests: ["Travel", "Photography"] },
    { name: "Noah Kim", username: "noahk", bio: "Indie game dev. Ask me about pixel art.", location: "Seoul", interests: ["Gaming", "Art", "Tech"] },
    { name: "Aisha Patel", username: "aishap", bio: "Bookworm and yoga lover. Quiet but fun.", location: "Mumbai", interests: ["Books", "Yoga"] },
    { name: "Diego Alvarez", username: "diegox", bio: "Musician. I write songs at 3am.", location: "Mexico City", interests: ["Music", "Songwriting"] },
    { name: "Emma Novak", username: "emman", bio: "Plant mom, film nerd, and language learner.", location: "Prague", interests: ["Film", "Languages", "Plants"] },
    { name: "Kai Tanaka", username: "kait", bio: "Surfer and UX researcher. Ocean > office.", location: "Tokyo", interests: ["Surfing", "UX", "Travel"] },
  ];
  const colors = ["#B5B1DC", "#7C9D8C", "#FBFF62", "#ADA28C"];
  return base.map((b, i) => ({
    id: `seed_${i}`,
    name: b.name,
    username: b.username,
    email: `${b.username}@vybora.app`,
    password: "password",
    avatarColor: colors[i % colors.length],
    bio: b.bio,
    location: b.location,
    interests: b.interests,
    online: i % 3 !== 0,
    verified: true,
    joinedAt: new Date(Date.now() - i * 86400000 * 12).toISOString(),
    isPrivate: false,
    showOnline: true,
  }));
}