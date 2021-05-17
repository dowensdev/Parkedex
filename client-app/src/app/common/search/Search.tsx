import React, { SyntheticEvent } from 'react';
import { observer } from "mobx-react-lite";
import { useStore } from '../../stores/store';
import { Input } from 'semantic-ui-react';

export default observer(function Search() {
    const {parkStore, commonStore} = useStore();
    const {getParkSearchResults, setParkSearch} = parkStore;
    const {searchTimeout} = commonStore

    function onSearchChange(e: SyntheticEvent<HTMLInputElement>) {
        clearTimeout(searchTimeout);
        if(e.currentTarget.value.length > 0) {
            setParkSearch(e.currentTarget.value);
        } else {
            setParkSearch('');
        }
        setTimeout(getParkSearchResults, 1000);
    }
    
    return (
        <Input
            name='search'
            type='text'
            placeholder='Search Parks'
            onChange={(e) => onSearchChange(e)}
            size='large'
        />
    )
})
