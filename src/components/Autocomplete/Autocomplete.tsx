import { FormEvent, useEffect, useState } from "react";
import { AutocompleteItem, AutocompleteProps } from "../../types";
import './Autocomplete.css';

export default function Autocomplete(autocompleteProps: AutocompleteProps) {
  const [searchInputState, setSearchInputState] = useState({ searchInput: '', matchingItems: [] as AutocompleteItem [] });
  const [itemsOpenState, setItemsOpenState] = useState({ target: {} as HTMLInputElement, display: true });
  const [itemSelectedState, setItemSelectedState] = useState('');

  const handleSearchInputChange = (itemTextInputEvent: FormEvent<HTMLInputElement>) => {
    // set the items that start with the search phrase from those in the list and remove any duplicates
    const filteredItems = autocompleteProps.autocompleteItems.filter((itemName: AutocompleteItem) =>
      itemName.name.toLowerCase().startsWith(itemTextInputEvent.currentTarget.value.toLowerCase())).sort((a, b) => a.name.localeCompare(b.name));

    // Remove any duplicates
    const distinctFilteredItems = [...new Set(filteredItems.map((item) => item.name))].map((distinctItem: string)=>{
      return { name : distinctItem } as AutocompleteItem;
    });  
    setSearchInputState({ searchInput: itemTextInputEvent.currentTarget.value, matchingItems: distinctFilteredItems });
    setItemsOpenState({ target: itemTextInputEvent.currentTarget, display: true });
    setItemSelectedState(itemTextInputEvent.currentTarget.value);
  }

  // Handle the selected item click and when the user clicks outside of the autocomplete list
  const handleDocumentClick = (event: MouseEvent) => {
    if ((event.target as HTMLElement).id.startsWith(`${autocompleteProps.name}-autocomplete-item`)) {
      setItemSelectedState((event.target as HTMLElement).innerText);
      autocompleteProps.onItemSelected((event.target as HTMLElement).innerText);
    }
    if (itemsOpenState && itemsOpenState.target.name !== (event.target as HTMLInputElement).name) {
      setItemsOpenState({ target: {} as HTMLInputElement, display: false });
    }
  }

  // Add the above document click event handler
  useEffect(() => {    
    document.addEventListener('click', handleDocumentClick);
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    }
  })

  return (
    <div className="autocomplete">
      <input
          type="text"
          name={autocompleteProps.name}
          placeholder={autocompleteProps.placeholder}
          onInput={handleSearchInputChange}
          value={itemSelectedState}>
      </input>
      { itemsOpenState.display && searchInputState.searchInput !== '' &&
        <div className="autocomplete-items">
          { searchInputState.matchingItems.map((item: AutocompleteItem, index) =>
            (<div key={index} id={`${autocompleteProps.name}-autocomplete-item$-${index}`}><strong>{item.name.substring(0, searchInputState.searchInput.length)}</strong>{item.name.substring(searchInputState.searchInput.length)}</div>)) }
        </div>
      }
    </div>
  )
}
