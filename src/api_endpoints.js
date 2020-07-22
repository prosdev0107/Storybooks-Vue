const data_providers = {
    sticker: {
        list: "/story/stickers"
    },
    template: {
        list: (type, from, length) =>  "/story/templates?type="+type+"&from="+(from || 0)+"&length="+(length || 24)
    },
    clip: {
        read:   (cnv_short_code) => "/story/clip/"+cnv_short_code,
        update: (cnv_short_code) => "/story/clip/"+cnv_short_code+"/update"
    },
    cs_item: {
        list:   (cnv_short_code) => "/story/clip/"+cnv_short_code+"/cs_items",
        create: (cnv_short_code) => "/story/clip/"+cnv_short_code+"/cs_items/create",
        read:   (cnv_short_code, cs_item_id) => "/story/clip/"+cnv_short_code+"/cs_items/"+cs_item_id,
        update: (cnv_short_code, cs_item_id) => "/story/clip/"+cnv_short_code+"/cs_items/"+cs_item_id+"/update"
        // No delete endpoint here, as it's already managed by API cs_items.update
    },
    cs_items: {
        update: (cnv_short_code) => "/story/clip/"+cnv_short_code+"/cs_items/update"
    },
    cs_media: {
        list:   (offset, limit) => "/story/media?offset="+(offset || 0)+"&limit="+(limit || 0),
        create: () => "/story/media/create"
    },
}

export default data_providers