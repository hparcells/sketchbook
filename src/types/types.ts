import { Prisma } from '@prisma/client';

export type FullSketchbook = Prisma.SketchbookGetPayload<{
  include: {
    pages: true;
    days: true;
  };
}>;
