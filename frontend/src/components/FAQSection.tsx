import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { HelpCircle, Search, Eye, ThumbsUp, ThumbsDown } from "lucide-react";
import { useFAQs } from "@/hooks/useFAQs";
import { useState } from "react";

const FAQSection = () => {
  const { faqs, searchQuery, setSearchQuery, incrementView, vote } = useFAQs();
  const [votedItems, setVotedItems] = useState<Set<number>>(new Set());

  const handleVote = (id: number, helpful: boolean) => {
    if (!votedItems.has(id)) {
      vote(id, helpful);
      setVotedItems(prev => new Set(prev).add(id));
    }
  };

  return (
    <section id="faq" className="py-24 relative">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">FAQ</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-6">
            Frequently Asked <span className="text-gradient-primary">Questions</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Everything investors and users need to know about NexusBank
          </p>
          
          {/* Search Bar */}
          <div className="max-w-xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search FAQs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-glass border-border"
              />
            </div>
            {searchQuery && (
              <p className="text-sm text-muted-foreground mt-2">
                Found {faqs.length} result{faqs.length !== 1 ? 's' : ''}
              </p>
            )}
          </div>
        </div>

        <div className="max-w-3xl mx-auto">
          {faqs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No FAQs found matching your search.</p>
            </div>
          ) : (
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq) => (
                <AccordionItem 
                  key={faq.id} 
                  value={`item-${faq.id}`}
                  className="bg-glass rounded-2xl border-none px-6 data-[state=open]:ring-2 data-[state=open]:ring-primary/20 transition-all duration-300"
                  onClick={() => incrementView(faq.id)}
                >
                  <AccordionTrigger className="text-left py-6 hover:no-underline group">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-primary/20 transition-colors">
                        <HelpCircle className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <span className="font-semibold text-foreground group-hover:text-primary transition-colors">
                          {faq.question}
                        </span>
                        <div className="flex items-center gap-2 mt-2">
                          <Eye className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{faq.views} views</span>
                        </div>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 pl-12">
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      {faq.answer}
                    </p>
                    
                    {/* Voting */}
                    <div className="flex items-center gap-4 pt-4 border-t border-border">
                      <span className="text-sm text-muted-foreground">Was this helpful?</span>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleVote(faq.id, true)}
                          disabled={votedItems.has(faq.id)}
                          className="gap-2"
                        >
                          <ThumbsUp className="h-4 w-4" />
                          <span>{faq.helpfulVotes}</span>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleVote(faq.id, false)}
                          disabled={votedItems.has(faq.id)}
                          className="gap-2"
                        >
                          <ThumbsDown className="h-4 w-4" />
                          <span>{faq.notHelpfulVotes}</span>
                        </Button>
                      </div>
                      {votedItems.has(faq.id) && (
                        <span className="text-xs text-green-500">Thanks for your feedback!</span>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </div>

        {/* Contact CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 px-8 py-6 bg-glass rounded-2xl">
            <p className="text-muted-foreground">
              Still have questions?
            </p>
            <a 
              href="mailto:support@nexusbank.io" 
              className="text-primary font-semibold hover:underline underline-offset-4 transition-all"
            >
              Contact our team →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
