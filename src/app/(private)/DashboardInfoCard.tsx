import { Button } from '@/components/ui/button';
import { CardContent, CardHeader ,Card, CardTitle} from '@/components/ui/card';
import { Plus } from 'lucide-react';
import React from 'react';

interface InfoCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, value, change, isPositive }) => {
  return (
    
      <Card className='text-center gap-0'>
        <CardHeader>
            <CardTitle className="text-sm text-gray-600 font-semibold">{title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-800">{value}</div>
            <div className={`text-sm ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
              {change}
            </div>
          </CardContent>
      </Card>
  );
};
 const DashboardInfoCard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 my-10">
      <InfoCard
        title="Total Sales"
        value="$120k"
        change="+47.5%"
        isPositive={true}
      />
      <InfoCard
        title="Total Revenue"
        value="$85k"
        change="+32.1%"
        isPositive={true}
      />
      <InfoCard
        title="Total Products"
        value="1,024"
        change="-5.2%"
        isPositive={false}
      />
      <Card className="text-center gap-0 bg-gradient-to-tl from-[#e51e5a] to-[#f3c6d4] text-white">
        <CardContent className="flex justify-center items-center h-full">
          <div>
            <Button size="icon" className="rounded-full" variant="secondary">
              <Plus></Plus>
            </Button>
            <div className="text-sm font-semibold ml-2">Add New Product</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardInfoCard;