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
    <Layout style={{ height: '100vh' }}>
      <Content style={{ padding: '20px' }}>
        <Card>
          <MapContainer center={[47.9186, 106.8893]} zoom={11} style={{ height: '750px', width: '100%' }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {branches.map((branch: any, idx: number) => {
              const loc = branch.location;
              return loc?.latitude && loc?.longitude ? (
                <Marker key={idx} position={[loc.latitude, loc.longitude]}>
                  <Popup>
                    {/* <strong>{loc.address}</strong> */}
                    {/* <br />
                    {loc.city}, {loc.district}
                    <br />
                    {loc.khoroo} */}
                    <br />
                    {branch.name}
                    {/* <br />
                    {branch.status} */}
                    <br />
                    {branch.weekdaysHours}
                    <br />
                    {branch.weekendHours}
                    <br/>
                    {branch.features.isOpen24Hours ? 'Open 24 Hours' : 'Closed'}
                    <br />
                    {branch.features.sellsAlcohol ? 'Sells Alcohol' : 'No Alcohol'}
                    <br />
                    {branch.features.hasFoodToGo ? '🍔' : ''}
                    <br />
                    {branch.features.sellsVape ? 'Sells Vape' : 'No Vape'}
                    <br />
                    {branch.features.sellsCigarettes ? 'Sells Cigarettes' : 'No Cigarettes'}
                    <br />
                    {branch.features.hasPowerBankRental ? 'Power Bank Rental Available' : 'No Power Bank Rental'}
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
