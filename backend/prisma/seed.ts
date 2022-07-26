import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';
import { movies, users } from '../data';
const prisma = new PrismaClient();

async function main() {
  for (const movie of movies) {
    await prisma.movie.create({
      data: movie,
    });
  }

  for (const user of users) {
    await prisma.user.create({
      data: {
        ...user,
        password: await hash(user.password, 10),
      },
    });
  }

  //   const AllUsers = await prisma.user.findMany();
  //   const AllMovies = await prisma.movie.findMany();

  //   // create favourite movie list for each userId
  //   AllMovies.forEach(async (movie, index) => {
  //     if (index % 2 == 0) {
  //       await prisma.favoriteMovie.createMany({
  //         data: {
  //           movieId: movie.id,
  //           userId: AllUsers[0].id,
  //         },
  //       });
  //     } else {
  //       await prisma.favoriteMovie.createMany({
  //         data: {
  //           movieId: movie.id,
  //           userId: AllUsers[1].id,
  //         },
  //       });
  //     }
  //   });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
