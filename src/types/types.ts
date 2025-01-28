import { Prisma } from '@prisma/client';

export type FullSketchbook = Prisma.SketchbookGetPayload<{
  include: {
    pages: true;
    days: true;
  };
}>;

export interface SketchbookCreationFormValues {
  name: string;
}

export interface PageCreationFormValues {
  name: string;
  fileName: string;
}
