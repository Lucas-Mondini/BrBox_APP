import psycopg2
con = psycopg2.connect(host='localhost', database='BRBOX',
user='postgres', password='BBox@123')
cur = con.cursor()
sql = '''select
    game.id as gameId,
    game.name gameName,
    tag_data.name tagname,
    SUM(tag_data.qty_tot) as qty_total,
    SUM(tag_data.qty_up) as qty_up,
    SUM(tag_data.qty_neut) as qty_neutral,
    SUM(tag_data.qty_down) as qty_down
from 
    game
left join (
            select
                tvltvtv."tagValueListId",
            tag.id,
            tag."name",
            value."name" as value_name,
            value.id as value_id,
            count(tag_value."valueId") as qty_tot,
            count(CASE when value.id = 1 then 1 end) as qty_up,
            count(CASE when value.id = 2 then 1 end) as qty_neut,
            count(CASE when value.id = 3 then 1 end) as qty_down
        from
            tag_value_list
        inner join 
            tag_value_list_tag_values_tag_value tvltvtv on tvltvtv."tagValueListId" = tag_value_list.id
        inner join 
            tag_value on tag_value.id = tvltvtv."tagValueId"
        inner join 
            tag on  tag.id = tag_value."tagId"
        inner join 
            value on value.id = tag_value."valueId" 
        group by 
            tvltvtv."tagValueListId", tag.id, tag."name", value.id, value."name"
) tag_data on (game."tagListId" = tag_data."tagValueListId")
group by
    game.id,
    game."name",
	tag_data."name"
order by 
    game.id
    limit 100'''
cur.execute(sql)
recset = cur.fetchall()
print(cur.description)
for rec in recset:
    print (rec)
con.close()