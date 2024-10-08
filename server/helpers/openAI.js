const { OpenAI } = require("openai");
require("dotenv").config();

module.exports = async function openAI(getExercise, gender, height, weigth, wheightGoalOn30day) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `${getExercise}
${{ gender, height, weigth, wheightGoalOn30day }}
Buat rutinitas latihan gym mingguan berdsarkan data di atas menggunakan data latihan berikut. Setiap hari latihan harus mencakup 4 latihan yang berbeda, jumlah setRepetition maksimal adalah 12 dan minimal 8, jumlah totalSet berkisr antara 3-4. Gunakan format JSON berikut untuk setiap hari latihan: 

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
  return completion
  
};
