import mongoose from "mongoose";
import dotenv from "dotenv";
import Movie from "../models/Movie";
import Genre from "../models/Genre";

dotenv.config();

const genres = [
    { id: 1, name: "Action", description: "High-energy films with exciting stunts, chases, and physical feats", icon: "https://raw.githubusercontent.com/iliasde12/data_json_project/refs/heads/main/images/genres/photo1.jpg", color: "#ff4757" },
    { id: 2, name: "Comedy", description: "Humorous films designed to entertain and amuse audiences", icon: "https://raw.githubusercontent.com/iliasde12/data_json_project/refs/heads/main/images/genres/photo2.jpg", color: "#ffa502" },
    { id: 3, name: "Drama", description: "Serious, plot-driven films focusing on realistic characters and emotional themes", icon: "https://raw.githubusercontent.com/iliasde12/data_json_project/refs/heads/main/images/genres/photo3.jpg", color: "#5f27cd" },
    { id: 4, name: "Sci-Fi", description: "Futuristic films exploring science, technology, and space", icon: "https://raw.githubusercontent.com/iliasde12/data_json_project/refs/heads/main/images/genres/photo4.jpg", color: "#00d2d3" },
    { id: 5, name: "Horror", description: "Frightening films designed to scare and thrill audiences", icon: "https://raw.githubusercontent.com/iliasde12/data_json_project/refs/heads/main/images/genres/photo5.jpg", color: "#2d3436" },
    { id: 6, name: "Romance", description: "Love stories and romantic relationships taking center stage", icon: "https://raw.githubusercontent.com/iliasde12/data_json_project/refs/heads/main/images/genres/photo6.jpg", color: "#ff6b81" },
    { id: 7, name: "Thriller", description: "Suspenseful films with tension, excitement, and unexpected twists", icon: "https://raw.githubusercontent.com/iliasde12/data_json_project/refs/heads/main/images/genres/photo7.jpg", color: "#341f97" },
    { id: 8, name: "Animation", description: "Animated films for all ages using various animation techniques", icon: "https://raw.githubusercontent.com/iliasde12/data_json_project/refs/heads/main/images/genres/photo8.jpg", color: "#48dbfb" },
];

const movies = [
    { id: 1, title: "Velocity Strike", description: "A former special ops agent must race against time to stop a terrorist plot in downtown Manhattan.", year: 2023, rating: 8.1, duration: 128, director: "Michael Chen", poster: "https://raw.githubusercontent.com/iliasde12/data_json_project/refs/heads/main/images/movies/photo1.jpg", genre_id: 1 },
    { id: 2, title: "The Last Laugh", description: "Two rival comedians team up for one final tour that changes their lives forever.", year: 2024, rating: 7.5, duration: 105, director: "Sarah Johnson", poster: "https://raw.githubusercontent.com/iliasde12/data_json_project/refs/heads/main/images/movies/photo2.jpg", genre_id: 2 },
    { id: 3, title: "Echoes of Tomorrow", description: "In a dystopian future, humanity's last hope rests with an AI that's learning to feel.", year: 2024, rating: 8.7, duration: 145, director: "James Park", poster: "https://raw.githubusercontent.com/iliasde12/data_json_project/refs/heads/main/images/movies/photo3.jpg", genre_id: 4 },
    { id: 4, title: "Midnight Whispers", description: "A family moves into an old mansion only to discover they're not alone.", year: 2023, rating: 7.2, duration: 98, director: "Emily Rodriguez", poster: "https://raw.githubusercontent.com/iliasde12/data_json_project/refs/heads/main/images/movies/photo4.jpg", genre_id: 5 },
    { id: 5, title: "Hearts in Paris", description: "An unexpected encounter in the city of love leads to a whirlwind romance.", year: 2024, rating: 7.8, duration: 112, director: "Sophie Laurent", poster: "https://raw.githubusercontent.com/iliasde12/data_json_project/refs/heads/main/images/movies/photo5.jpg", genre_id: 6 },
    { id: 6, title: "Broken Promises", description: "A powerful drama about a family torn apart by secrets and reunited by tragedy.", year: 2023, rating: 8.9, duration: 136, director: "David Williams", poster: "https://raw.githubusercontent.com/iliasde12/data_json_project/refs/heads/main/images/movies/photo6.jpg", genre_id: 3 },
    { id: 7, title: "The Forgotten Trail", description: "A detective hunts a serial killer who leaves cryptic clues at each crime scene.", year: 2024, rating: 8.3, duration: 118, director: "Robert Martinez", poster: "https://raw.githubusercontent.com/iliasde12/data_json_project/refs/heads/main/images/movies/photo7.jpg", genre_id: 7 },
    { id: 8, title: "Sky Pirates", description: "A young adventurer joins a crew of sky pirates on a quest for legendary treasure.", year: 2024, rating: 8.5, duration: 102, director: "Anna Kim", poster: "https://raw.githubusercontent.com/iliasde12/data_json_project/refs/heads/main/images/movies/photo8.jpg", genre_id: 8 },
    { id: 9, title: "Code Red", description: "When a cyber attack threatens global security, an elite team must go off the grid.", year: 2023, rating: 7.9, duration: 122, director: "Tom Anderson", poster: "https://raw.githubusercontent.com/iliasde12/data_json_project/refs/heads/main/images/movies/photo9.jpg", genre_id: 1 },
    { id: 10, title: "Laugh Track", description: "Behind the scenes of a struggling sitcom where real drama unfolds off-camera.", year: 2024, rating: 7.3, duration: 95, director: "Lisa Thompson", poster: "https://raw.githubusercontent.com/iliasde12/data_json_project/refs/heads/main/images/movies/photo10.jpg", genre_id: 2 },
    { id: 11, title: "Quantum Paradox", description: "A physicist discovers a way to travel through parallel universes, but at what cost?", year: 2023, rating: 8.6, duration: 140, director: "Christopher Lee", poster: "https://raw.githubusercontent.com/iliasde12/data_json_project/refs/heads/main/images/movies/photo11.jpg", genre_id: 4 },
    { id: 12, title: "The Inheritance", description: "Siblings gather for their father's will reading, uncovering dark family secrets.", year: 2024, rating: 7.6, duration: 108, director: "Patricia Davis", poster: "https://raw.githubusercontent.com/iliasde12/data_json_project/refs/heads/main/images/movies/photo12.jpg", genre_id: 5 },
    { id: 13, title: "Summer in Tuscany", description: "A chef travels to Italy and finds both culinary inspiration and unexpected love.", year: 2024, rating: 7.7, duration: 110, director: "Marco Rossi", poster: "https://raw.githubusercontent.com/iliasde12/data_json_project/refs/heads/main/images/movies/photo13.jpg", genre_id: 6 },
    { id: 14, title: "Silent Witness", description: "A lawyer must defend a client who refuses to speak, while uncovering a conspiracy.", year: 2023, rating: 8.4, duration: 126, director: "Jennifer Brown", poster: "https://raw.githubusercontent.com/iliasde12/data_json_project/refs/heads/main/images/movies/photo14.jpg", genre_id: 7 },
    { id: 15, title: "The Color Symphony", description: "In a world without color, a young girl discovers she can see and paint in vibrant hues.", year: 2024, rating: 8.8, duration: 98, director: "Yuki Tanaka", poster: "https://raw.githubusercontent.com/iliasde12/data_json_project/refs/heads/main/images/movies/photo15.jpg", genre_id: 8 },
    { id: 16, title: "Redemption Road", description: "An ex-convict struggles to rebuild his life while protecting his daughter from his past.", year: 2023, rating: 8.2, duration: 132, director: "Marcus Wright", poster: "https://raw.githubusercontent.com/iliasde12/data_json_project/refs/heads/main/images/movies/photo16.jpg", genre_id: 3 },
    { id: 17, title: "Shadow Protocol", description: "A spy discovers she's been unknowingly working for the enemy all along.", year: 2024, rating: 8.0, duration: 115, director: "Alex Turner", poster: "https://raw.githubusercontent.com/iliasde12/data_json_project/refs/heads/main/images/movies/photo17.jpg", genre_id: 7 },
    { id: 18, title: "Galactic Odyssey", description: "A crew on a deep space mission encounters an ancient alien civilization.", year: 2024, rating: 8.9, duration: 155, director: "Steven Cooper", poster: "https://raw.githubusercontent.com/iliasde12/data_json_project/refs/heads/main/images/movies/photo18.jpg", genre_id: 4 },
    { id: 19, title: "Wedding Crashers 2.0", description: "Two best friends accidentally crash a celebrity wedding and chaos ensues.", year: 2024, rating: 7.1, duration: 100, director: "Kevin Hart", poster: "https://raw.githubusercontent.com/iliasde12/data_json_project/refs/heads/main/images/movies/photo19.jpg", genre_id: 2 },
    { id: 20, title: "Desert Storm", description: "An elite military unit must survive behind enemy lines after a mission goes wrong.", year: 2023, rating: 7.8, duration: 120, director: "Ryan Mitchell", poster: "https://raw.githubusercontent.com/iliasde12/data_json_project/refs/heads/main/images/movies/photo20.jpg", genre_id: 1 },
];

const seed = async () => {
    await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/mijndb");

    // Leeg de collections
    await Genre.deleteMany({});
    await Movie.deleteMany({});
    console.log("🗑️  Collections geleegd");

    // Genres seeden en id→ObjectId map bijhouden
    const genreMap = new Map<number, mongoose.Types.ObjectId>();
    for (const g of genres) {
        const created = await Genre.create({
            name: g.name,
            description: g.description,
            icon: g.icon,
            color: g.color,
        });
        genreMap.set(g.id, created._id);
    }
    console.log("✅ Genres aangemaakt");

    // Movies seeden met juiste ObjectId
    for (const m of movies) {
        await Movie.create({
            title: m.title,
            description: m.description,
            year: m.year,
            rating: m.rating,
            duration: m.duration,
            director: m.director,
            poster: m.poster,
            genre: genreMap.get(m.genre_id),
        });
    }
    console.log("✅ Films aangemaakt");

    process.exit(0);
};

seed().catch((err) => {
    console.error(err);
    process.exit(1);
});