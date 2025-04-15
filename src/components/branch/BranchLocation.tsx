'use client';
import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Layout, Card, Spin } from 'antd';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { GET_BRANCHES } from "@/graphql/queries";
import L from 'leaflet';

const { Content } = Layout;

// Leaflet icon fix
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// GraphQL query
export interface Branch {
  id: string;
  name: string;
  status: string;
  imageUrl: string;
  type: string;
  region: string;
  weekdaysHours: string;
  weekendHours: string;
  location: Location;
  createdAt: string;
  features:{
    isOpen24Hours: boolean;
    sellsAlcohol: boolean;
    sellsFastFood: boolean;
    sellsCigarettes: boolean;
    hasPowerBankRental: boolean;
  }
}
export interface Location {
  city: string;
  district: string;
  khoroo: string;
  address: string;
  latitude: number;
  longitude: number;
}

const LocationPage: React.FC = () => {
  const { loading, error, data } = useQuery(GET_BRANCHES);

  if (loading) return <Spin tip="Loading map..." />;
  if (error) return <div>Error: {error.message}</div>;

  const branches = data?.getBranches?.items || [];

  return (
    <Layout >
      <Content >
        <Card>
          <MapContainer center={[47.9186, 106.8893]} zoom={11} style={{ height: '600px', width: '100%' }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {branches.map((branch: any, idx: number) => {
              const loc = branch.location;
              return loc?.latitude && loc?.longitude ? (
                <Marker key={idx} position={[loc.latitude, loc.longitude]}>
                  <Popup>
                    <div className="min-w-[240px] font-sans text-sm text-gray-700">
                      <div className="flex items-center gap-2 font-semibold mb-2">
                       <span>🏬</span>
                        <span>{branch.branchCode} - {branch.name}</span>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {branch.features.hasFoodToGo && (
                         <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-gray-100 text-xs text-gray-600">
                            🥡 Food to go
                          </span>
                          )}
                       {branch.features.sellsAlcohol && (
                         <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-gray-100 text-xs text-gray-600">
                          🍷 Согтууруулах ундаа
                        </span>
                          )}
                      </div>

                     <div className="font-semibold text-center mb-1">Цагийн хуваарь</div>
                       <div className="space-y-1">
                         <div className="flex justify-between">
                            <span>Даваа, Мягмар, Лхагва, Пүрэв</span>
                              <span>08:00 - 23:00</span>
                          </div>
                       <div className="flex justify-between">
                         <span>Баасан</span>
                          <span>08:00 - 24:00</span>
                       </div>
                       <div className="flex justify-between">
                          <span>Бямба, Ням</span>
                          <span>09:00 - 23:00</span>
                        </div>
                     </div>
                    </div>
                  </Popup>
                </Marker>
              ) : null;
            })}
          </MapContainer>
        </Card>
      </Content>
    </Layout>
  );
};

export default LocationPage;
