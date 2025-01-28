'use server';

import { Sketchbook } from '@prisma/client';

import prisma from '@/database/database';

export async function getSketchbooks(): Promise<Sketchbook[]> {
  return await prisma.sketchbook.findMany();
}
