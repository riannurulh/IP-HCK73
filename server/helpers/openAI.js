const { OpenAI } = require("openai");
require("dotenv").config();

module.exports = async function openAI(gender, height, weigth, wheightGoalOn30day) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `[
  { "name": "Push-up" },
  { "name": "Bench Press" },
  { "name": "Dumbbell Flyes" },
  { "name": "Deadlift" },
  { "name": "Pull-up" },
  { "name": "Lat Pulldown" },
  { "name": "Squat" },
  { "name": "Leg Press" },
  { "name": "Lunges" },
  { "name": "Shoulder Press" },
  { "name": "Lateral Raises" },
  { "name": "Front Raises" },
  { "name": "Bicep Curl" },
  { "name": "Tricep Dips" },
  { "name": "Hammer Curl" },
  { "name": "Treadmill" },
  { "name": "Sepeda Statis" },
  { "name": "Elliptical" },
  { "name": "Rower" },
  { "name": "Plank" },
  { "name": "Crunches" },
  { "name": "Stretching" },
  { "name": "Yoga" },
  { "name": "Kettlebell Swings" },
  { "name": "Medicine Ball Throws" },
  { "name": "Battle Ropes" }
]
${{ gender, height, weigth, wheightGoalOn30day }}
Buat rutinitas latihan gym mingguan berdsarkan data di atas menggunakan data latihan berikut. Setiap hari latihan harus mencakup 4 latihan yang berbeda. Gunakan format JSON berikut untuk setiap hari latihan: 

routine:[
  {
    "day": "monday",
    "ExerciseId": 1,
    "totalSet": 4,
    "setRepetition": 12
  },
  {
    "day": "monday",
    "ExerciseId": 2,
    "totalSet": 3,
    "setRepetition": 12
  },
  {
    "day": "monday",
    "ExerciseId": 4,
    "totalSet": 4,
    "setRepetition": 10
  },
  {
    "day": "monday",
    "ExerciseId": 7,
    "totalSet": 4,
    "setRepetition": 60
  }
]

Format latihan yang dihasilkan untuk setiap hari latihan harus memiliki 4 latihan yang berbeda dengan aturan sebagai berikut:
Monday: ExerciseId 1, 2, 4, 7
Tuesday: ExerciseId 3, 5, 8, 9
Wednesday: ExerciseId 6, 10, 1, 3
Thursday: ExerciseId 2, 4, 7, 8
Friday: ExerciseId 5, 6, 9, 10
Saturday: ExerciseId 1, 3, 7, 9
Sunday: ExerciseId 2, 4, 6, 8
Buat rutinitas seperti contoh di atas dengan 4 latihan per hari. `
      },
    ],
    model: 'gpt-4o-mini',
    response_format: { type: "json_object" },
  });
//   console.log(completion);
  return completion
  
};
