// import { PrismaClient } from "@prisma/client";
// import { withOptimize } from "@prisma/extension-optimize";

// const prisma = new PrismaClient().$extends(
//   withOptimize({ apiKey: process.env.OPTIMIZE_API_KEY || "" })
// );


import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

export const prisma = new PrismaClient().$extends(withAccelerate())

