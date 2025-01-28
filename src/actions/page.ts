'use server';

import { Page } from '@prisma/client';

import prisma from '@/database/database';

import { PageCreationFormValues } from '@/types/types';

import { getSketchbook } from './sketchbook';

export async function createPage(
  sketchbookId: string,
  formData: PageCreationFormValues
): Promise<Page | null> {
  const sketchbook = await getSketchbook(sketchbookId);
  if (!sketchbook) {
    return null;
  }
  const indices = sketchbook.pages.map((page) => {
    return page.index;
  });
  const maxIndex = Math.max(...indices);

  return await prisma.page.create({
    data: {
      index: maxIndex + 1,
      name: formData.name,
      fileName: formData.fileName,
      sketchbook: {
        connect: {
          id: sketchbookId
        }
      }
    }
  });
}
