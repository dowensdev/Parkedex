import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroller';
import { Grid, Loader } from 'semantic-ui-react'
import Search from '../../../app/common/search/Search';
import LoaderComponent from '../../../app/layout/LoaderComponent';
import { PagingParams } from '../../../app/models/pagination';
import { useStore } from '../../../app/stores/store';
import AllParksList from './AllParksList';
import ParkItemPlaceholder from './ParkItemPlaceholder';
import VisitedParksList from './VisitedParksList';

export default observer(function ParkDashboard() {
    const {userStore, parkStore } = useStore();
    const {loadParks, setPagingParams, pagination} = parkStore;
    const {getUser, setVisitedParks, loadingVisitedList, isLoggedIn} = userStore;
    const [loadingNext, setLoadingNext] = useState(false);

    function handleGetNext() {
        setLoadingNext(true);
        setPagingParams(new PagingParams(pagination!.currentPage + 1));
        loadParks().then(() =>setLoadingNext(false));
    }

    useEffect(() => {
        if(getUser != null) setVisitedParks();
    }, [getUser, setVisitedParks])


    if (isLoggedIn && loadingVisitedList)  return <LoaderComponent content='Loading Visited Parks' />;

    return (
        <>
            <Grid>
                <Grid.Column width='11'>
                <Search />
                {parkStore.loadingInitial && !loadingNext ? (
                    <>
                        <ParkItemPlaceholder />
                        <ParkItemPlaceholder />
                    </>
                ) : (
                    <InfiniteScroll
                        pageStart={0}
                        loadMore={handleGetNext}
                        hasMore={!loadingNext && !!pagination && pagination.currentPage < pagination.totalPages}
                        initialLoad={false}
                    >
                        <AllParksList />
                    </InfiniteScroll>
                )}
                </Grid.Column>
                <Grid.Column width='5'>
                    <VisitedParksList />
                </Grid.Column>
                <Grid.Column width={10}>
                    <Loader active={loadingNext} />
                </Grid.Column>
            </Grid>
        </>
    )
})