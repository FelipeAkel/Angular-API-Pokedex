export const mockPokedexFormFilter = {
    inNamePokemon: 'pikachu',
    inTypePokemon: {
        value: 'electric', 
        name: 'Elétrico - Electric', 
        class: 'electric',
    }
}

export const mockSetListPokemon = [
    {
        name: 'bulbasaur',
        status: {
        types: [
            { type: { name: 'grass' } },
            { type: { name: 'poison' } }
        ]
        }
    },
    {
        name: 'ivysaur',
        status: {
        types: [
            { type: { name: 'grass' } },
            { type: { name: 'poison' } }
        ]
        }
    },
    {
        name: 'venusaur',
        status: {
        types: [
            { type: { name: 'grass' } },
            { type: { name: 'poison' } }
        ]
        }
    },
    {
        name: 'charmander',
        status: {
        types: [
            { type: { name: 'fire' } }
        ]
        }
    },
    {
        name: 'charmeleon',
        status: {
        types: [
            { type: { name: 'fire' } }
        ]
        }
    },
    {
        name: 'charizard',
        status: {
        types: [
            { type: { name: 'fire' } },
            { type: { name: 'flying' } }
        ]
        }
    },
    {
        name: 'squirtle',
        status: {
        types: [
            { type: { name: 'water' } }
        ]
        }
    },
    {
        name: 'wartortle',
        status: {
        types: [
            { type: { name: 'water' } }
        ]
        }
    },
    {
        name: 'blastoise',
        status: {
        types: [
            { type: { name: 'water' } }
        ]
        }
    }
];

export const mockApiSetListPokemon = {
    results: [
        {
            name: 'bulbasaur',
            url: 'https://pokeapi.co/api/v2/pokemon/1/',
            status: {
                types: [
                    { type: { name: 'grass' } },
                    { type: { name: 'poison' } }
                ]
            }
        },
        {
            name: 'ivysaur',
            url: 'https://pokeapi.co/api/v2/pokemon/2/',
            status: {
                types: [
                    { type: { name: 'grass' } },
                    { type: { name: 'poison' } }
                ]
            }
        },
        {
            name: 'venusaur',
            url: 'https://pokeapi.co/api/v2/pokemon/3/',
            status: {
                types: [
                    { type: { name: 'grass' } },
                    { type: { name: 'poison' } }
                ]
            }
        },
        {
            name: 'charmander',
            url: 'https://pokeapi.co/api/v2/pokemon/4/',
            status: {
                types: [
                    { type: { name: 'fire' } }
                ]
            }
        },
        {
            name: 'charmeleon',
            url: 'https://pokeapi.co/api/v2/pokemon/5/',
            status: {
                types: [
                    { type: { name: 'fire' } }
                ]
            }
        },
        {
            name: 'charizard',
            url: 'https://pokeapi.co/api/v2/pokemon/6/',
            status: {
                types: [
                    { type: { name: 'fire' } },
                    { type: { name: 'flying' } }
                ]
            }
        },
        {
            name: 'squirtle',
            url: 'https://pokeapi.co/api/v2/pokemon/7/',
            status: {
                types: [
                    { type: { name: 'water' } }
                ]
            }
        },
        {
            name: 'wartortle',
            url: 'https://pokeapi.co/api/v2/pokemon/8/',
            status: {
                types: [
                    { type: { name: 'water' } }
                ]
            }
        },
        {
            name: 'blastoise',
            url: 'https://pokeapi.co/api/v2/pokemon/9/',
            status: {
                types: [
                    { type: { name: 'water' } }
                ]
            }
        }
    ]
};
