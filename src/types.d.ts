export interface AutocompleteItem {
    name: string;
  }
  
export interface AutocompleteProps {
  name: string;
  placeholder: string;
  autocompleteItems: AutocompleteItem[];
  onItemSelected(itemSelectedValue: string): void;
}