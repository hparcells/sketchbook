'use client';

import { useRouter } from 'next/navigation';
import { IconButton, Stack, Table, Text } from '@chakra-ui/react';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';
import { FaPencil, FaRegTrashCan } from 'react-icons/fa6';

import CreatePageDialog from '@/components/dialog/CreatePageDialog';

import { deletePage, movePageDown, movePageUp } from '@/actions/page';

import { FullSketchbook } from '@/types/types';

function SketchbookPagesTab({ sketchbook }: { sketchbook: FullSketchbook }) {
  const router = useRouter();

  async function movePage(pageId: string, direction: 'up' | 'down') {
    if (direction === 'up') {
      await movePageUp(pageId);
    } else {
      await movePageDown(pageId);
    }

    router.refresh();
  }

  async function onDeleteClick(pageId: string) {
    await deletePage(pageId);
    router.refresh();
  }

  return (
    <Stack align='flex-start'>
      <CreatePageDialog sketchbook={sketchbook} />
      {sketchbook.pages.length > 0 ? (
        <Table.Root size='sm'>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>Page</Table.ColumnHeader>
              <Table.ColumnHeader>File Name</Table.ColumnHeader>
              <Table.ColumnHeader textAlign='end'>Actions</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {sketchbook.pages
              .sort((a, b) => {
                return a.index - b.index;
              })
              .map((page, i) => {
                return (
                  <Table.Row key={page.id}>
                    <Table.Cell>{page.name}</Table.Cell>
                    <Table.Cell>{page.fileName}</Table.Cell>
                    <Table.Cell textAlign='end'>
                      <IconButton
                        variant='outline'
                        size='xs'
                        onClick={() => {
                          movePage(page.id, 'up');
                        }}
                        disabled={i === 0}
                      >
                        <FaArrowUp />
                      </IconButton>
                      <IconButton
                        variant='outline'
                        size='xs'
                        onClick={() => {
                          movePage(page.id, 'down');
                        }}
                        disabled={i === sketchbook.pages.length - 1}
                      >
                        <FaArrowDown />
                      </IconButton>
                      <IconButton variant='outline' size='xs'>
                        <FaPencil />
                      </IconButton>
                      <IconButton
                        variant='outline'
                        size='xs'
                        onClick={() => {
                          onDeleteClick(page.id);
                        }}
                      >
                        <FaRegTrashCan />
                      </IconButton>
                    </Table.Cell>
                  </Table.Row>
                );
              })}
          </Table.Body>
        </Table.Root>
      ) : (
        <Text>No pages configured.</Text>
      )}
    </Stack>
  );
}

export default SketchbookPagesTab;
