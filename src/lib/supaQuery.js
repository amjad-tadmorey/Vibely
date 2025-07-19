import { supabase } from "./supabase"


const applyFilters = (query, filters = []) => {
    filters.forEach(({ column, operator, value }) => {
        query = query[operator](column, value)
    })
    return query
}

export const supaQuery = async (table, options = {}) => {
    let { filters = [], limit, offset, orderBy, single = false } = options
    let query = supabase.from(table).select('*')

    query = applyFilters(query, filters)

    if (orderBy) {
        query = query.order(orderBy.column, { ascending: orderBy.ascending })
    }
    if (limit) query = query.limit(limit)
    if (offset) query = query.offset(offset)
    if (single) query = query.single()

    const { data, error } = await query
    if (error) throw error
    return data
}

export async function supaInsert(table, payload) {
    const { data, error } = await supabase.from(table).insert(payload).select()
    if (error) throw error
    return data
}

export async function supaDelete(table, match) {
    const { data, error } = await supabase.from(table).delete().match(match)
    if (error) throw error
    return data
}

export async function supaUpdate(table, match, updates) {
    const { data, error } = await supabase.from(table).update(updates).match(match)
    if (error) throw error
    return data
}