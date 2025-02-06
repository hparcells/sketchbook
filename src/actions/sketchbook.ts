'use server';

import { Sketchbook } from '@prisma/client';

import prisma from '@/database/database';

import { FullSketchbook, SketchbookCreationFormValues } from '@/types/types';

export async function getAllSketchbooks(): Promise<FullSketchbook[]> {
  return await prisma.sketchbook.findMany({
    include: {
      pages: true,
      days: true
    }
  });
}

export async function getSketchbooks(): Promise<FullSketchbook[]> {
  return await prisma.sketchbook.findMany({
    include: {
      pages: true,
      days: true
    },
    where: {
      unlisted: false
    }
  });
}

export async function getSketchbook(sketchbookId: string): Promise<FullSketchbook | null> {
  try {
    return await prisma.sketchbook.findUnique({
      where: {
        id: sketchbookId
      },
      include: {
        pages: {
          orderBy: {
            index: 'asc'
          }
        },
        days: true
      }
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    return null;
  }
}

export async function createSketchbook(
  formData: SketchbookCreationFormValues
): Promise<Sketchbook> {
  return await prisma.sketchbook.create({
    data: {
      name: formData.name,
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
