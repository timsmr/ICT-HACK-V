interface Column {
  title: string;
  text: string;
}

export interface SubBlockProps {
  title: string;
  columns: Column[];
  children?: React.ReactNode;
}
