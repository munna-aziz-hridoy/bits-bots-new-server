import mongoose from 'mongoose'
import { config } from 'dotenv'
config()

const dbConnection = new Promise((resolve, reject) => {
  const dbURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@bitsbots.0dfcwbf.mongodb.net/bitsBots`

  try {
    mongoose.connect(dbURI).then(() => {
      console.log('Database is connected')
      resolve({ message: 'Database is connected' })
    })
  } catch (error) {
    console.log(error)
    reject({
      message: 'Something went wrong while connecting database',
      error,
    })
  }
})

export default dbConnection
