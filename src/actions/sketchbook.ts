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

export async function updateSketchbook(
  sketchbookId: string,
  name: string,
  shortDescription: string,
  description: string,
  pageRootUrl: string
): Promise<Sketchbook> {
  return await prisma.sketchbook.update({
    where: {
      id: sketchbookId
    },
    data: {
      name,
      shortDescription,
      description,
      pageRootUrl
    }
  });
}

export async function deleteSketchbook(sketchbookId: string): Promise<void> {
  await prisma.sketchbook.delete({
    where: {
      id: sketchbookId
    }
  });
}
