export interface TypePokemonModel {
    value: string;
    name: string;
    class: string;
}

export interface PokedexFormFilterModel {
    inNamePokemon: string;
    inTypePokemon: {
        value: string;
        name: string;
        class: string;
    }
}

export interface GetListAllPokemonsModel {
    count: string,
    next: string
    previous: string,
    results: ResultsModel,
}

export interface ResultsModel {
    name: string,
    url: string,
    status: any,    // TODO
}
