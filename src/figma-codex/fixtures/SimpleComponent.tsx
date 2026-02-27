export interface SimpleComponentProps {
  /** The display label */
  label: string;
  /** Optional size variant */
  size?: 'sm' | 'md' | 'lg';
}

export const SimpleComponent = (props: SimpleComponentProps) => (
  <div>{props.label}</div>
);
