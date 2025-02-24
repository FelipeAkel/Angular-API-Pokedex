export interface TypePokemonModel {
    value: string;
    name: string;
    class: string;
}

export interface ListPokemonModel {
    id: number | string,
    name: string,
    description: string,
    image: string,
    typePokemon: string,
}
