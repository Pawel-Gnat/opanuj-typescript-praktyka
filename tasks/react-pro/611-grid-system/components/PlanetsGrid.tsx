import React from 'react';

interface PlanetsGridProps<Item, As extends React.ElementType> {
  items: Item[];
  renderItem: (item: Item) => React.ReactNode;
  as?: As;
  columns: number;
}

type ListProps<Item, As extends React.ElementType> = PlanetsGridProps<Item, As> &
  Omit<React.ComponentPropsWithoutRef<As>, keyof PlanetsGridProps<Item, As>>;

export function PlanetsGrid<Item, As extends React.ElementType = 'ul'>({
  items,
  renderItem,
  as,
  columns,
  ...rest
}: ListProps<Item, As>) {
  const Component = as || 'ul';
  return (
    <Component className="bg-gray-900" data-testid="planets-grid" {...rest}>
      <div className={`grid gap-6 grid-cols-1 md:grid-cols-${columns} auto-rows-fr`}>
        {items.map(renderItem)}
      </div>
    </Component>
  );
}
