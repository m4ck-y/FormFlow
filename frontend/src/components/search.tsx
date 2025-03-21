import React, { useEffect, useState } from 'react';
import { SearchOutlined, FileExcelOutlined } from '@ant-design/icons';
import { Button, Flex, Select, Space, Tooltip, Divider, message } from 'antd';
import { http } from "../api/http";
import { AudioOutlined } from '@ant-design/icons';
import { Input } from 'antd';
const { Search } = Input;

interface FechasResponse {
  fechas: string[];
  total: number;
}

const SearchCard: React.FC = () => {
  const [value, setFechas] = useState<string[]>([]);


  useEffect(() => {
    http.get<FechasResponse>(`/campania/fechas`).then((response) => {
      setFechas(response.value?.fechas || []);
    });
  }, []);

/*   const onSearch = () => {
    if (fechaSelected) {
      buscarCampanias(fechaSelected);
    }
  };

  const handleChangeSelect = (value: string) => {
    setFechaSelected(value);
  };
 */
 /*  const handleGenerateReport = async () => {
    if (fechaSelected) {
      try {
        setGeneratingReports(true);
        const response = await http.get<ReportResponse>('/reporte', {
          fecha: fechaSelected
        });
        
        if (response.value) {
          message.success(response.value.mensaje);
          // Refrescar la tabla para mostrar estados actualizados
          buscarCampanias(fechaSelected);
        }
      } catch (error) {
        message.error('Error iniciando generación de reportes');
        console.error('Error:', error);
      } finally {
        setGeneratingReports(false);
      }
    }
  }; */

  return (
    <Search placeholder="buscar..."  onSearch={(value) => console.log(value)} enterButton />
  )
      
}

export default SearchCard;