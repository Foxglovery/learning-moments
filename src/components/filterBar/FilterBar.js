export const FilterBar = ({setSearchTerm}) => {
    return (
        <div id="search_div">
    <input
                onChange={(event) => {
                    setSearchTerm(event.target.value)

                }}
                type="text"
                placeholder="Search Posts"
                className="ticket-search"
            />
    </div>
    )
}