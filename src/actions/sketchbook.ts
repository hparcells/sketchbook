'use server';

import { Sketchbook } from '@prisma/client';

import prisma from '@/database/database';

export async function getSketchbooks(): Promise<Sketchbook[]> {
  return await prisma.sketchbook.findMany();
}

export async function getSketchbook(sketchbookId: string): Promise<Sketchbook | null> {
  return await prisma.sketchbook.findUnique({
    where: {
      id: sketchbookId
    }
  });
}

export async function createSketchbook(name: string): Promise<Sketchbook> {
  return await prisma.sketchbook.create({
    data: {
      name,
      description: '',
      shortDescription: '',
      pageRootUrl: ''
    }
  });
}
