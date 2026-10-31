/// <reference types="node" />
import { PostStatus, PostType, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const AUTHOR_ID = 'seed-author';
const SUBSCRIBER_ID = 'seed-subscriber';
const POST_ID = '00000000-0000-4000-8000-000000000001';

async function main() {
  await prisma.post.upsert({
    where: { id: POST_ID },
    create: {
      id: POST_ID,
      type: PostType.text,
      title: 'Seed post',
      text: 'Minimal seed data.',
      userId: AUTHOR_ID,
      status: PostStatus.published,
      tags: ['seed'],
    },
    update: {},
  });

  await prisma.like.upsert({
    where: {
      userId_postId: {
        userId: SUBSCRIBER_ID,
        postId: POST_ID,
      },
    },
    create: {
      postId: POST_ID,
      userId: SUBSCRIBER_ID,
    },
    update: {},
  });

  const existingComment = await prisma.comment.findFirst({
    where: { postId: POST_ID, userId: SUBSCRIBER_ID },
  });

  if (!existingComment) {
    await prisma.comment.create({
      data: {
        postId: POST_ID,
        userId: SUBSCRIBER_ID,
        text: 'Seed comment.',
      },
    });
  }

  await prisma.subscription.upsert({
    where: {
      subscriberId_authorId: {
        subscriberId: SUBSCRIBER_ID,
        authorId: AUTHOR_ID,
      },
    },
    create: {
      subscriberId: SUBSCRIBER_ID,
      authorId: AUTHOR_ID,
    },
    update: {},
  });
}

main()
  .catch((error) => {
    console.error(error);
    process?.exit?.(1);
  })
  .finally(async () => {
    await prisma?.$disconnect?.();
  });
