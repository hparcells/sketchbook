'use server';

import { Page } from '@prisma/client';

import { getSketchbook } from '@/actions/sketchbook';

import prisma from '@/database/database';

import { PageCreationFormValues } from '@/types/types';

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
  let maxIndex;
  if (indices.length === 0) {
    maxIndex = 0;
  } else {
    maxIndex = Math.max(...indices);
  }

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

export async function getPages(sketchbookId: string): Promise<Page[]> {
  return await prisma.page.findMany({
    where: {
      sketchbookId
    },
    orderBy: {
      index: 'asc'
    }
  });
}

export async function getPage(pageId: string): Promise<Page | null> {
  return await prisma.page.findUnique({
    where: {
      id: pageId
    }
  });
}

export async function getAllPages(): Promise<Page[]> {
  return await prisma.page.findMany();
}

export async function deletePage(pageId: string): Promise<Page> {
  return await prisma.page.delete({
    where: {
      id: pageId
    }
  });
}

export async function updatePage(
  pageId: string,
  formData: PageCreationFormValues
): Promise<Page | null> {
  const page = await getPage(pageId);
  if (!page) {
    return null;
  }

  return await prisma.page.update({
    where: {
      id: page.id
    },
    data: {
      name: formData.name,
      fileName: formData.fileName
    }
  });
}

export async function movePageUp(pageId: string): Promise<void> {
  const page = await getPage(pageId);
  if (!page) {
    return;
  }

  const sketchbookId = page.sketchbookId;
  const sketchbook = await getSketchbook(sketchbookId);
  if (!sketchbook) {
    return;
  }

  const indices = sketchbook.pages
    .map((page) => {
      return page.index;
    })
    .sort((a, b) => {
      return a - b;
    });
  if (indices.length < 2) {
    return;
  }

  const currentIndex = indices.indexOf(page.index);
  if (currentIndex === 0) {
    return;
  }

  const previousIndex = indices[currentIndex - 1];
  const previousPage = sketchbook.pages.find((page) => {
    return page.index === previousIndex;
  });
  if (!previousPage) {
    return;
  }

  await prisma.page.update({
    where: {
      id: pageId
    },
    data: {
      index: previousPage.index
    }
  });
  await prisma.page.update({
    where: {
      id: previousPage.id
    },
    data: {
      index: page.index
    }
  });
}

export async function movePageDown(pageId: string): Promise<void> {
  const page = await getPage(pageId);
  if (!page) {
    return;
  }

  const sketchbookId = page.sketchbookId;
  const sketchbook = await getSketchbook(sketchbookId);
  if (!sketchbook) {
    return;
  }

  const indices = sketchbook.pages
    .map((page) => {
      return page.index;
    })
    .sort((a, b) => {
      return a - b;
    });
  if (indices.length < 2) {
    return;
  }

  const currentIndex = indices.indexOf(page.index);
  if (currentIndex === indices.length - 1) {
    return;
  }

  const nextIndex = indices[currentIndex + 1];
  const nextPage = sketchbook.pages.find((page) => {
    return page.index === nextIndex;
  });
  if (!nextPage) {
    return;
  }

  await prisma.page.update({
    where: {
      id: pageId
    },
    data: {
      index: nextPage.index
    }
  });
  await prisma.page.update({
    where: {
      id: nextPage.id
    },
    data: {
      index: page.index
    }
  });
}
