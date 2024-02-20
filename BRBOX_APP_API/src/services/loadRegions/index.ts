import { AppDataSource } from '../../data-source';
import axios from 'axios';
import Region from '../../Model/Game/regions';

const fetchDataAndSaveRegion = async () => {
    const response = await axios.get("https://api.isthereanydeal.com/v01/web/regions/");
    const regionDataList = response.data.data;

    const regions = await AppDataSource.getRepository(Region).find()
    const promises = [];
    try {
        for (let region of Object.entries(regionDataList) as any) {
            
            let data = new Region();
            const key = region[0]
            const value = region[1]
            const existingRegion = regions.find(r => r.acronym === key);
            if (existingRegion) {
                data = existingRegion;
            }

            data.acronym = key;
            data.countries = value.countries;
            data.currency = value.currency;

            promises.push(AppDataSource.getRepository(Region).save(data));
        }
    } catch (error) {
        console.error('Erro ao fazer chamada à API ou salvar dados no banco de dados:');
    }

    await Promise.all(promises);
}

export {
    fetchDataAndSaveRegion
}