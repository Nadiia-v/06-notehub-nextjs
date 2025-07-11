import css from "./SearchBox.module.css";

interface SearchBoxProps {
  onSearchChange: (val: string) => void;
}

const SearchBox = ({ onSearchChange }: SearchBoxProps) => {
  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        onSearchChange(e.target.value)
      }
    />
  );
};

export default SearchBox;
