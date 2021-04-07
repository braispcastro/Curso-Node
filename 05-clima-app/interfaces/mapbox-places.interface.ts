export interface Place {
    type:        string;
    query:       string[];
    features:    Feature[];
    attribution: string;
}

export interface Feature {
    id:                   string;
    type:                 string;
    place_type:           string[];
    relevance:            number;
    properties:           Properties;
    text_es:              string;
    language_es?:         string;
    place_name_es:        string;
    text:                 string;
    language?:            string;
    place_name:           string;
    matching_text?:       string;
    matching_place_name?: string;
    center:               number[];
    geometry:             Geometry;
    context:              Context[];
    bbox?:                number[];
}

export interface Context {
    id:           string;
    text_es:      string;
    text:         string;
    wikidata?:    string;
    language_es?: string;
    language?:    string;
    short_code?:  string;
}

export interface Geometry {
    coordinates: number[];
    type:        string;
}

export interface Properties {
    wikidata?:   string;
    category?:   string;
    landmark?:   boolean;
    address?:    string;
    foursquare?: string;
    maki?:       string;
    accuracy?:   string;
}
