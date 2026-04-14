import type { FieldValues, Resolver } from 'react-hook-form';

type SchemaLoader = () => Promise<unknown>;

export function createLazyZodResolver<TFieldValues extends FieldValues>(
  loadSchema: SchemaLoader
): Resolver<TFieldValues> {
  let resolverPromise: Promise<Resolver<TFieldValues>> | null = null;

  const getResolver = () => {
    if (!resolverPromise) {
      resolverPromise = Promise.all([import('@hookform/resolvers/zod'), loadSchema()]).then(
        ([{ zodResolver }, schema]) =>
          zodResolver(schema as Parameters<typeof zodResolver>[0]) as Resolver<TFieldValues>
      );
    }

    return resolverPromise;
  };

  return async (values, context, options) => {
    const resolver = await getResolver();
    return resolver(values, context, options);
  };
}
