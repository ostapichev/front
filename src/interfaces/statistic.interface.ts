export interface IOrderStatistic {
    item_count?: number;
    user_count?: number;
    in_work?: number;
    new_order?: number;
    agree?: number;
    disagree?: number;
    dubbing?: number;
}

export interface IUserStatistic {
    count_orders?: number;
    in_work?: number;
    agree?: number;
    disagree?: number;
    dubbing?: number;
}
