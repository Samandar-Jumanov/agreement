import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { History } from 'lucide-react';

export function RecentClients() {
  const clients = [
    {
      name: "Olivia Martin",
      email: "olivia.martin@email.com",
      amount: "+$1,999.00",
      avatar: "/avatars/01.png",
      initials: "OM"
    },
    {
      name: "Jackson Lee",
      email: "jackson.lee@email.com",
      amount: "+$39.00",
      avatar: "/avatars/02.png",
      initials: "JL"
    },
    {
      name: "Isabella Nguyen",
      email: "isabella.nguyen@email.com",
      amount: "+$299.00",
      avatar: "/avatars/03.png",
      initials: "IN"
    },
    {
      name: "William Kim",
      email: "will@email.com",
      amount: "+$99.00",
      avatar: "/avatars/04.png",
      initials: "WK"
    },
    {
      name: "Sofia Davis",
      email: "sofia.davis@email.com",
      amount: "+$39.00",
      avatar: "/avatars/05.png",
      initials: "SD"
    }
  ];

  const handleViewHistory = (clientEmail : string ) => {
    console.log(`Viewing history for ${clientEmail}`);
    // Add your navigation logic here
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Recent Clients</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {clients.map((client) => (
            <div key={client.email} className="flex items-center justify-between">
              <div className="flex items-center">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={client.avatar} alt={`${client.name}'s avatar`} />
                  <AvatarFallback>{client.initials}</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">{client.name}</p>
                  <p className="text-sm text-muted-foreground">{client.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-medium">{client.amount}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleViewHistory(client.email)}
                  className="flex items-center gap-2"
                >
                  <History className="h-4 w-4" />
                  History
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default RecentClients;